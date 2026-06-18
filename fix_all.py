import re

def rep(filepath, target, kr, en):
    with open(filepath, 'r') as f:
        c = f.read()
    if target in c:
        rep_str = f"{{lang === 'kr' ? (\n                                <>{kr}</>\n                            ) : (\n                                <>{en}</>\n                            )}}"
        c = c.replace(target, rep_str)
        with open(filepath, 'w') as f:
            f.write(c)
    else:
        print(f"Not found: {target}")

one = 'src/components/SectionIotaOne.jsx'
two = 'src/components/SectionIotaTwo.jsx'

rep(one, 'Central Plaza:<br />\n                            A Grand Stage Between City and Nature',
    '중앙광장:<br />도시와 자연을 잇는 웅장한 무대',
    'Central Plaza:<br />A Grand Stage Between City and Nature')

rep(one, 'Rooftop Garden:<br className="md:hidden" /> Nature at Your Office Doorstep',
    'Rooftop Garden:<br className="md:hidden" /> 오피스 문 앞으로 다가온 자연',
    'Rooftop Garden:<br className="md:hidden" /> Nature at Your Office Doorstep')

# notice the second one is in Third Item Area, 1. Rooftop Garden: Nature at Your Office Doorstep
# But user wanted Rooftop Garden: 남산의 파노라마 뷰를 품은 사색의 공간
# Currently BOTH are "Rooftop Garden:<br className="md:hidden" /> Nature at Your Office Doorstep" in lines 57, 89?
# Oh wow, they are identical text in the code! I can replace them based on occurrence or modify the script to just replace all, wait, the user gave two different translations for Rooftop Garden.
