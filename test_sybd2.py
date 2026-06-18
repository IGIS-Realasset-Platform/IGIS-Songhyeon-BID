import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Make sure CSS is in there properly
if '.sybd-step.up-out' not in html:
    print("CSS is missing!")
else:
    print("CSS found")

# Fix missing class `up-out` and `down-in` in original step 1/2 if they aren't working
# Actually `active` class is what gives them visible state and pointing.
# Let's ensure the `id="scroll-container"` actually gets the scroll event
# Yes, `const scrollContainer = document.getElementById("scroll-container");` is working for the header toggling.
    print("All good")

