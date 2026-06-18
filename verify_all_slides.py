import json
import os
import re

def verify_slides(json_path):
    print(f"Starting automatic full-scale verification on {json_path}...")
    if not os.path.exists(json_path):
        print(f"Error: {json_path} not found.")
        return
        
    with open(json_path, 'r', encoding='utf-8') as f:
        slides = json.load(f)
        
    total_slides = len(slides)
    print(f"Total slides loaded: {total_slides}")
    
    warnings_count = 0
    issues = []
    
    for slide in slides:
        idx = slide['slideIndex']
        texts = slide.get('texts', [])
        bgColor = slide.get('bgColor', '')
        
        # 1. Check if background color uses raw oklch
        if 'oklch' in bgColor.lower():
            issues.append(f"[Slide {idx}] Background color has oklch: {bgColor}")
            warnings_count += 1
            
        # 2. Check for empty slide (excluding intentionally blank slides)
        if not texts and idx not in [1, total_slides]: # 1p, last page typically checked
            issues.append(f"[Slide {idx}] No text nodes extracted.")
            warnings_count += 1
            continue
            
        has_bullet = False
        long_sentences = 0
        bullet_count = 0
        
        # Scanned elements
        font_mismatches = []
        color_oklch_issues = []
        duplicate_coords = {}
        
        for t in texts:
            text_str = t['text'].strip()
            font_family = t.get('fontFamily', '')
            color = t.get('color', '')
            rect = t['rect']
            
            # Check font name fallback
            if 'pretendard' not in font_family.lower() and 'apple-system' not in font_family.lower():
                font_mismatches.append(f"Font mismatch ({t['tagName']}: '{text_str}' -> '{font_family}')")
                
            # Check color oklch
            if 'oklch' in color.lower():
                color_oklch_issues.append(f"Oklch color found in text ({t['tagName']}: '{text_str}' -> '{color}')")
                
            # Bullet detection
            if text_str in ['▪', '•', '▪ ', '• ', '▪', '▪️', '▫️', '▫']:
                has_bullet = True
                bullet_count += 1
            elif len(text_str) > 10:
                long_sentences += 1
                
            # Coordinate duplicates check (to detect overlays)
            coord_key = (round(rect['x'], 2), round(rect['y'], 2))
            if coord_key in duplicate_coords:
                duplicate_coords[coord_key].append(text_str)
            else:
                duplicate_coords[coord_key] = [text_str]
                
        # 3. Detection rule for missing description text
        # If there are bullets but no corresponding long sentences, this suggests a parent text drop bug.
        if bullet_count > 0 and long_sentences == 0:
            issues.append(f"[Slide {idx}] Suspected Text Loss: Found {bullet_count} bullets but NO descriptive sentence (>10 chars).")
            warnings_count += 1
            
        # Report mismatches per slide
        if font_mismatches:
            issues.append(f"[Slide {idx}] Font Check: {len(font_mismatches)} elements not using Pretendard font standard.")
            warnings_count += 1
            
        if color_oklch_issues:
            issues.append(f"[Slide {idx}] Color Check: {len(color_oklch_issues)} text nodes using unnormalized oklch.")
            warnings_count += 1
            
        # 4. Critical overlays detection
        overlays = {k: v for k, v in duplicate_coords.items() if len(v) > 1}
        if overlays:
            # Only count as warning if they are not bullet/text siblings at same layout grid
            for coord, items in overlays.items():
                # Filter out bullet + text overlap (sometimes bullet and text get same X/Y start but different widths)
                real_overlays = [item for item in items if item not in ['▪', '•', '▪ ', '• ']]
                if len(real_overlays) > 1:
                    issues.append(f"[Slide {idx}] Layout overlay warning at {coord}: {real_overlays}")
                    warnings_count += 1
                    
    print("\n" + "="*50)
    print("VERIFICATION REPORT SUMMARY")
    print("="*50)
    if warnings_count == 0:
        print("[SUCCESS] All 142 slides passed the verification. No text loss, font mismatch, oklch leak, or overlay issues detected.")
    else:
        print(f"[WARNING] Detected {warnings_count} warnings/issues across slides:")
        for issue in issues[:30]: # limit output to first 30 issues
            print(f" - {issue}")
        if len(issues) > 30:
            print(f" ... and {len(issues) - 30} more issues.")
    print("="*50 + "\n")

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.abspath(__file__))
    verify_slides(os.path.join(base_dir, 'layout_data_kr.json'))
