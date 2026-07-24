import re

with open('d:/Downloads/Universal project structure/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

def get_section(html, section_id):
    pattern = r'(<!-- [^-]+ -->\s*<section class="section scrollspy-section" id="' + section_id + r'".*?</section>)'
    match = re.search(pattern, html, re.DOTALL)
    return match.group(1) if match else ''

sections = {
    'beginner-roadmap': get_section(html, 'beginner-roadmap'),
    'phase0': get_section(html, 'phase0'),
    'briefing-wizard': get_section(html, 'briefing-wizard'),
    'context-kit': get_section(html, 'context-kit'),
    'structure': get_section(html, 'structure'),
    'vibe-coding': get_section(html, 'vibe-coding'),
    'principles': get_section(html, 'principles'),
    'ui-libraries': get_section(html, 'ui-libraries'),
    'deployment': get_section(html, 'deployment'),
    'glossary': get_section(html, 'glossary')
}

stage3_banner = '''
    <!-- STAGE 3 BANNER -->
    <div class="stage-banner">
      <div class="stage-banner-num">STAGE 3</div>
      <h2 class="stage-banner-title">Plan Your App</h2>
      <p class="stage-banner-desc">Gather requirements and generate your 5 AI Briefing Documents.</p>
    </div>
'''

stage45_banner = '''
    <!-- STAGE 4 & 5 BANNER -->
    <div class="stage-banner">
      <div class="stage-banner-num">STAGE 4 & 5</div>
      <h2 class="stage-banner-title">Scaffold & Vibe Code</h2>
      <p class="stage-banner-desc">Learn the folder structure, pick UI libraries, and build your AI Prompts.</p>
    </div>
'''

stage6_banner = '''
    <!-- STAGE 6 BANNER -->
    <div class="stage-banner">
      <div class="stage-banner-num">STAGE 6</div>
      <h2 class="stage-banner-title">Launch & Appendix</h2>
      <p class="stage-banner-desc">Checklist for deployment and technical jargon buster.</p>
    </div>
'''

new_body = (
    sections['beginner-roadmap'] + "\n\n" +
    stage3_banner + "\n" +
    sections['phase0'] + "\n\n" +
    sections['briefing-wizard'] + "\n\n" +
    sections['context-kit'] + "\n\n" +
    stage45_banner + "\n" +
    sections['structure'] + "\n\n" +
    sections['vibe-coding'] + "\n\n" +
    sections['principles'] + "\n\n" +
    sections['ui-libraries'] + "\n\n" +
    stage6_banner + "\n" +
    sections['deployment'] + "\n\n" +
    sections['glossary']
)

start_marker = '<!-- Section 1: Zero-to-Hero Beginner Roadmap -->'
end_marker = '<!-- Floating Bottom Navigation -->'

start_idx = html.find(start_marker)
end_idx = html.find(end_marker)

final_html = html[:start_idx] + new_body + "\n\n    " + html[end_idx:]

with open('d:/Downloads/Universal project structure/index.html', 'w', encoding='utf-8') as f:
    f.write(final_html)

print('Reordered successfully')
