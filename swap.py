with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

p_start = -1
p_end = -1
t_start = -1
t_end = -1

for i, line in enumerate(lines):
    if '<section id="projets"' in line:
        p_start = i
    if '</section>' in line and p_start != -1 and p_end == -1:
        p_end = i
    
    if '<section id="tp"' in line:
        t_start = i - 1  # Inclus le commentaire au dessus
    if '</section>' in line and t_start != -1 and t_end == -1:
        t_end = i

print(f"Projets: {p_start} to {p_end}")
print(f"TP: {t_start} to {t_end}")

if p_start != -1 and t_start != -1 and t_start > p_end:
    new_lines = lines[:p_start] + lines[t_start:t_end+1] + ['\n'] + lines[p_start:p_end+1] + lines[t_end+1:]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print('Swapped successfully.')
else:
    print('Already swapped or parsing failed.')
