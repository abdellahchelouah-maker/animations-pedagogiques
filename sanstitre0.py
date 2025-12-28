import os
import glob
import re

root_dir = 'pages'
success = 0

for html_file in glob.glob(os.path.join(root_dir, '**/*.html'), recursive=True):
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # ✅ 2ème image de la page
        all_images = re.findall(r'<img[^>]*src=["\'][^"\']*/([^"\\/]+\.(?:png|jpg|jpeg|gif))', content, re.IGNORECASE)
        if len(all_images) < 2:
            print(f"⚠️ Moins de 2 images: {os.path.basename(html_file)}")
            continue
        
        filename_full = all_images[1]
        filename = filename_full.rsplit('.', 1)[0]
        
        new_block = f'''<div class="download-buttons">
  <a href="../../media/swf/{filename}.swf" class="btn" download>
    Télécharger au format SWF
  </a>
  <a href="../../media/exe/{filename}.exe" class="btn" download>
    Télécharger au format EXE
  </a>
</div>'''
        
        content_fixed = re.sub(r'<div class="download-buttons"[\s\S]*?</div>', new_block, content, flags=re.DOTALL)
        
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content_fixed)
        
        print(f"✅ {filename}: {os.path.basename(html_file)}")
        success += 1
        
    except Exception as e:
        print(f"❌ Erreur {html_file}: {e}")

print(f"\n🎉 {success} pages corrigées!")
