import json
import os
from pathlib import Path

# Load JSON data
with open('content.json') as f:
    services = json.load(f)

# Load template
with open('template.html') as f:
    template = f.read()

# Create output directory
output_dir = Path('generated_pages')
output_dir.mkdir(exist_ok=True)

for filename, data in services.items():
    # Create a copy of the template for each page
    html = template
    
    # Replace title tag
    html = html.replace('<title></title>', f'<title>{data["meta"]["metaTitle"]}</title>')
    
    # Replace meta description
    html = html.replace(
        'content="Discover the science of chakras',
        f'content="{data["meta"]["metaDescription"]}"'
    )
    
    # Replace meta keywords
    html = html.replace(
        'content="chakra, meditation, energy, self-healing, yoga"',
        f'content="{data["meta"]["metaKeywords"]}"'
    )
    
    # Replace main image
    html = html.replace(
        '../assets/images/post-featured.jpg',
        data["image"]
    )
    
    # Replace content titles
    html = html.replace('class="title-1"></h1>', f'class="title-1">{data["title"]}</h1>')
   # html = html.replace('id="title-2"', f'id="title-2">{data["title"]}')
    html = html.replace('id="title-2">', f'id="title-2">{data["title"]}')
    html = html.replace('id="title-3">', f'id="title-3">{data["title"]}')
    
    # Replace description
    html = html.replace('id="description">', f'id="description">{data["description"]}')
    
    # Navigation links
    prev_link = data["previous"] or "#"
    next_link = data["next"] or "#"
    
    html = html.replace(
        'id="previous-post-link" href="#"',
        f'id="previous-post-link" href="{prev_link}"'
    ).replace(
        'id="next-post-link" href="#"',
        f'id="next-post-link" href="{next_link}"'
    )

    # Save generated file
    output_path = output_dir / filename
    with open(output_path, 'w') as f:
        f.write(html)

print(f"Generated {len(services)} pages in {output_dir}/")