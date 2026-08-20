insert into public.songhyeon_members
(email, staff_name, group_name, title, roles, responsibility, photo_path, gate_scope, platform_role, display_order, is_active)
values
('ethan.lee@igisam.com','이철승','부문대표','부문대표',array['송현 BID TF','부문대표'],'통합 의사결정 총괄','/이철승.webp',array['G0','G1','G2','G3','G4','G5','G6'],'manager',0,true),
('sjlee@igisam.com','이시정','기획추진센터','기획추진센터 리더',array['송현 BID TF'],'기획추진센터 총괄','/songhyeon-members/이시정.webp',array['G0','G1','G2','G3','G4','G5','G6'],'manager',1,true),
('kylee@igisam.com','이관용','기획추진센터','기획추진센터',array['송현 BID TF'],'기획추진 실행지원','/songhyeon-members/이관용.webp',array['G0','G1','G2','G3','G4','G5','G6'],'member',2,true),
('jk.jeon@igisam.com','전기영','기획추진센터','기획추진센터',array['송현 BID TF'],'사업방향·서울시 협력·사업구조 및 주요 승인','/songhyeon-members/전기영.webp',array['G0','G1','G2','G3','G4','G5','G6'],'admin',3,true),
('minjik@igisam.com','김민지','기업마케팅','기업마케팅 Sr.Manager',array['송현 BID TF'],'기업 발굴·관계지원','/songhyeon-members/김민지.webp',array['G1','G2','G3'],'member',4,true),
('argoh@igisam.com','고아라','기업마케팅','기업마케팅',array['송현 BID TF'],'기업 접점·관계정보 인계','/songhyeon-members/고아라.webp',array['G1','G2','G3'],'member',5,true),
('hyunsoo.kim@igisam.com','김현수','공간솔루션센터','공간솔루션 책임자',array['송현 BID TF'],'서비스·운영모델 총괄','/songhyeon-members/김현수.webp',array['G1','G2','G3','G4','G5','G6'],'manager',6,true),
('ghlee@igisam.com','이가현','공간솔루션센터','공간솔루션 리더',array['송현 BID TF'],'서비스 설계·파트너 실무협의','/songhyeon-members/이가현.webp',array['G1','G2','G3','G4','G5','G6'],'member',7,true),
('smchung@igisam.com','정수명','공간솔루션센터','공간솔루션센터 차장',array['송현 BID TF'],'운영모델·성과관리','/songhyeon-members/정수명.webp',array['G2','G3','G4','G5','G6'],'member',8,true),
('subin.yim@igisam.com','임수빈','공간솔루션센터','공간솔루션 매니저',array['송현 BID TF'],'서비스 실행지원','/songhyeon-members/임수빈.webp',array['G2','G3','G4','G5','G6'],'member',9,true),
('chaemi.bang@igisam.com','방채미','공간솔루션센터','사원',array['송현 BID TF'],'서비스 운영 및 현장 실행 지원','songhyeon-members/방채미.webp',array['G2','G3','G4','G6'],'member',10,true),
('jiwon.lee@igisam.com','이지원','공간솔루션센터','사원',array['송현 BID TF'],'서비스 운영 및 현장 실행 지원','songhyeon-members/이지원.webp',array['G2','G3','G4','G6'],'member',11,true)
on conflict (email) do update set
staff_name=excluded.staff_name, group_name=excluded.group_name, title=excluded.title, roles=excluded.roles,
responsibility=excluded.responsibility, photo_path=excluded.photo_path, gate_scope=excluded.gate_scope,
platform_role=excluded.platform_role, display_order=excluded.display_order, is_active=true;
