import os
import sys
import subprocess

try:
    from PIL import Image
except ImportError:
    print("PIL (Pillow) is missing. Installing automatically via pip...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
        from PIL import Image
    except Exception as e:
        print(f"Failed to install Pillow: {e}")
        sys.exit(1)

def convert_black_to_transparent():
    # Analyze all JPG files in the brain directory
    import glob
    brain_dir = "C:/Users/jilla/.gemini/antigravity-ide/brain/1b087bc0-de1f-467e-8bf9-a21cdc157e7c"
    jpg_files = glob.glob(os.path.join(brain_dir, "*.jpg"))
    # ensure scratch dir exists
    os.makedirs(os.path.join(brain_dir, "scratch"), exist_ok=True)
    with open(os.path.join(brain_dir, "scratch/jpg_summary.txt"), "w") as f:
        f.write("=== JPG FILES ANALYSIS ===\n")
        for j in sorted(jpg_files):
            try:
                temp_img = Image.open(j)
                w, h = temp_img.size
                pixels = temp_img.load()
                corners = [pixels[0, 0], pixels[w-1, 0], pixels[0, h-1], pixels[w-1, h-1]]
                f.write(f"File: {os.path.basename(j)}\n")
                f.write(f"  Dimensions: {w}x{h}\n")
                f.write(f"  Size: {os.path.getsize(j)} bytes\n")
                f.write(f"  Corners: {corners}\n\n")
            except Exception as e:
                f.write(f"Error reading {os.path.basename(j)}: {e}\n\n")

    # 1. Dark Mode Image: Convert from #23243F background JPEG
    src_dark = "C:/Users/jilla/.gemini/antigravity-ide/brain/f27ae651-d982-46e7-8d2f-336899d5d8c4/media__1784088438924.jpg"
    if not os.path.exists(src_dark):
        src_dark = "C:/Users/jilla/.gemini/antigravity-ide/brain/f27ae651-d982-46e7-8d2f-336899d5d8c4/media__1784057602509.jpg"
        is_new_dark = False
    else:
        is_new_dark = True

    dest_public_dark = "public/lovable-uploads/vishnu-profile-dark.png"
    dest_assets_dark = "src/assets/vishnu-profile-dark.png"

    if os.path.exists(src_dark):
        print(f"Generating dark mode transparent PNG from {src_dark}...")
        img = Image.open(src_dark).convert("RGBA")
        width, height = img.size
        pixels = img.load()
        
        if is_new_dark:
            # Use BFS to find the #23243F background (35, 36, 63)
            visited = set()
            queue = []
            for x in range(width):
                queue.append((x, 0))
                queue.append((x, height - 1))
                visited.add((x, 0))
                visited.add((x, height - 1))
            for y in range(height):
                queue.append((0, y))
                queue.append((width - 1, y))
                visited.add((0, y))
                visited.add((width - 1, y))
                
            # Add seed points inside spectacles lens to queue
            for sy in range(200, 460, 4):
                for sx in range(350, 550, 4):
                    if (sx, sy) not in visited:
                        nr, ng, nb, _ = pixels[sx, sy]
                        diff = abs(int(nr)-35) + abs(int(ng)-36) + abs(int(nb)-63)
                        if diff < 15:
                            queue.append((sx, sy))
                            visited.add((sx, sy))
                            
            # BFS flood fill
            head = 0
            while head < len(queue):
                cx, cy = queue[head]
                head += 1
                r, g, b, a = pixels[cx, cy]
                for nx, ny in [(cx-1, cy), (cx+1, cy), (cx, cy-1), (cx, cy+1)]:
                    if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                        nr, ng, nb, _ = pixels[nx, ny]
                        diff = abs(int(nr)-35) + abs(int(ng)-36) + abs(int(nb)-63)
                        if diff < 20:
                            visited.add((nx, ny))
                            queue.append((nx, ny))
                            
            # Make background transparent
            for y in range(height):
                for x in range(width):
                    r, g, b, a = pixels[x, y]
                    if (x, y) in visited:
                        is_boundary = False
                        for nx, ny in [(x-1, y), (x+1, y), (x, y-1), (x, y+1), (x-1, y-1), (x+1, y-1), (x-1, y+1), (x+1, y+1)]:
                            if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                                is_boundary = True
                                break
                        if is_boundary:
                            pixels[x, y] = (r, g, b, 60)
                        else:
                            pixels[x, y] = (r, g, b, 0)
                    else:
                        pixels[x, y] = (r, g, b, 255)
        else:
            # Old distance-based black background removal
            datas = img.getdata()
            new_data = []
            for item in datas:
                r, g, b, a = item
                dist = (r*r + g*g + b*b) ** 0.5
                if dist < 28:
                    new_data.append((0, 0, 0, 0))
                elif dist < 68:
                    alpha = int((dist - 28) / (68 - 28) * 255)
                    alpha = max(0, min(255, alpha))
                    new_data.append((r, g, b, alpha))
                else:
                    new_data.append((r, g, b, 255))
            img.putdata(new_data)

        os.makedirs(os.path.dirname(dest_public_dark), exist_ok=True)
        os.makedirs(os.path.dirname(dest_assets_dark), exist_ok=True)
        img.save(dest_public_dark, "PNG")
        img.save(dest_assets_dark, "PNG")
        print("Successfully generated dark mode transparent PNG!")
    else:
        print(f"Dark mode source JPEG missing: {src_dark}")

    brain_dir = "C:/Users/jilla/.gemini/antigravity-ide/brain/1b087bc0-de1f-467e-8bf9-a21cdc157e7c"
    src_light = os.path.join(brain_dir, "media__1784088862321.jpg")
    if not os.path.exists(src_light):
        src_light = os.path.join(brain_dir, "media__1784059439973.jpg")

        
    dest_public_light = "public/lovable-uploads/vishnu-profile.png"
    dest_assets_light = "src/assets/vishnu-profile.png"

    if os.path.exists(src_light):
        print(f"Generating transparent PNG from latest source {src_light}...")
        img = Image.open(src_light).convert("RGBA")
        width, height = img.size
        pixels = img.load()

        # Simple BFS to find background pixels connected to corners and borders
        visited = set()
        queue = []
        # Add 4 corners and borders to initial queue
        for x in range(width):
            queue.append((x, 0))
            queue.append((x, height - 1))
            visited.add((x, 0))
            visited.add((x, height - 1))
        for y in range(height):
            queue.append((0, y))
            queue.append((width - 1, y))
            visited.add((0, y))
            visited.add((width - 1, y))

        # Find trapped white background inside spectacles area
        # and add them to the queue to flood-fill them as well
        for sy in range(200, 460, 4):
            for sx in range(350, 550, 4):
                if (sx, sy) not in visited:
                    nr, ng, nb, _ = pixels[sx, sy]
                    max_val = max(nr, ng, nb)
                    min_val = min(nr, ng, nb)
                    # Detect desaturated white/light gray background
                    if max_val > 242 and (max_val - min_val < 12):
                        queue.append((sx, sy))
                        visited.add((sx, sy))

        # Perform BFS flood fill
        head = 0
        while head < len(queue):
            cx, cy = queue[head]
            head += 1

            r, g, b, a = pixels[cx, cy]
            # Neighbors
            for nx, ny in [(cx-1, cy), (cx+1, cy), (cx, cy-1), (cx, cy+1)]:
                if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                    nr, ng, nb, _ = pixels[nx, ny]
                    # If neighbor is bright/off-white (vignette) and desaturated (close to grayscale) to avoid face skin leak
                    max_val = max(nr, ng, nb)
                    min_val = min(nr, ng, nb)
                    is_white_bg = (max_val > 150) and (max_val - min_val < 25)
                    
                    diff = abs(int(nr)-int(r)) + abs(int(ng)-int(g)) + abs(int(nb)-int(b))
                    if is_white_bg or (diff < 15 and nr > 160 and ng > 160 and nb > 160 and max_val - min_val < 20):
                        visited.add((nx, ny))
                        queue.append((nx, ny))

        # Apply smooth boundary-sensitive feathering on the flood-filled background mask
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                if (x, y) in visited:
                    # Check if on the boundary with foreground (8-way connectivity)
                    is_boundary = False
                    for nx, ny in [(x-1, y), (x+1, y), (x, y-1), (x, y+1), (x-1, y-1), (x+1, y-1), (x-1, y+1), (x+1, y+1)]:
                        if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                            is_boundary = True
                            break
                    
                    if is_boundary:
                        # Soften transition at the edge to prevent pixelation/jaggedness
                        pixels[x, y] = (r, g, b, 60)
                    else:
                        # Pure background is 100% transparent
                        pixels[x, y] = (r, g, b, 0)
                else:
                    # Foreground remains fully opaque
                    pixels[x, y] = (r, g, b, 255)

        dest_assets_avatar = "src/assets/vishnu-transparent-avatar.png"
        os.makedirs(os.path.dirname(dest_public_light), exist_ok=True)
        os.makedirs(os.path.dirname(dest_assets_light), exist_ok=True)
        img.save(dest_public_light, "PNG")
        img.save(dest_assets_light, "PNG")
        img.save(dest_assets_avatar, "PNG")
        print("Successfully generated clean, feathered transparent PNG files!")
    else:
        print(f"Light mode source JPEG missing: {src_light}")

    return True

def make_logo_transparent():
    logo_path = "public/logo.png"
    logo_assets_path = "src/assets/logo.png"
    favicon_path = "public/favicon.ico"
    
    target_path = None
    if os.path.exists(logo_path):
        target_path = logo_path
    elif os.path.exists(logo_assets_path):
        target_path = logo_assets_path
        
    if target_path:
        print(f"Making logo transparent from {target_path}...")
        img = Image.open(target_path).convert("RGBA")
        
        # Threshold: replace any pixels that are very close to white with transparent
        datas = img.getdata()
        new_data = []
        for item in datas:
            r, g, b, a = item
            # threshold: if all RGB channels are above 240, make it transparent
            if r > 240 and g > 240 and b > 240:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append((r, g, b, a))
        img.putdata(new_data)
        
        # Save to both paths and favicon
        img.save(logo_path, "PNG")
        img.save(logo_assets_path, "PNG")
        img.save(favicon_path, "PNG")
        print("Successfully made logo and favicon transparent!")
    else:
        print("No logo source file found to make transparent.")

def make_coffee_transparent():
    coffee_path = "public/coffee.png"
    coffee_assets_path = "src/assets/coffee.png"
    
    if os.path.exists(coffee_path):
        print(f"Making coffee transparent with halo-removal from {coffee_path}...")
        img = Image.open(coffee_path).convert("RGBA")
        width, height = img.size
        pixels = img.load()
        
        # BFS to find background pixels connected to corners and borders
        visited = set()
        queue = []
        
        # Add all borders to the queue
        for x in range(width):
            queue.append((x, 0))
            queue.append((x, height - 1))
            visited.add((x, 0))
            visited.add((x, height - 1))
        for y in range(height):
            queue.append((0, y))
            queue.append((width - 1, y))
            visited.add((0, y))
            visited.add((width - 1, y))
            
        head = 0
        while head < len(queue):
            cx, cy = queue[head]
            head += 1
            
            # Neighbors
            for nx, ny in [(cx-1, cy), (cx+1, cy), (cx, cy-1), (cx, cy+1)]:
                if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                    r, g, b, a = pixels[nx, ny]
                    max_val = max(r, g, b)
                    min_val = min(r, g, b)
                    # Background criteria: bright and desaturated (close to white/gray)
                    if max_val > 210 and (max_val - min_val < 25):
                        visited.add((nx, ny))
                        queue.append((nx, ny))
                        
        # Apply transparency and halo-removal
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                if (x, y) in visited:
                    # Pure background is 100% transparent
                    pixels[x, y] = (r, g, b, 0)
                else:
                    # Check if boundary pixel
                    is_boundary = False
                    for nx, ny in [(x-1, y), (x+1, y), (x, y-1), (x, y+1), (x-1, y-1), (x+1, y-1), (x-1, y+1), (x+1, y+1)]:
                        if 0 <= nx < width and 0 <= ny < height and (nx, ny) in visited:
                            is_boundary = True
                            break
                    if is_boundary:
                        max_val = max(r, g, b)
                        if max_val > 180:
                            # Strip off white outline/halo
                            pixels[x, y] = (r, g, b, 0)
                        elif max_val > 120:
                            # Soften edge
                            pixels[x, y] = (r, g, b, 60)
                            
        # Save to both locations
        img.save(coffee_path, "PNG")
        img.save(coffee_assets_path, "PNG")
        print("Successfully made coffee image transparent with halo-removal!")
    else:
        print("No coffee source file found to make transparent.")

def make_rocket_transparent():
    rocket_path = "public/rocket.png"
    rocket_assets_path = "src/assets/rocket.png"
    
    if os.path.exists(rocket_path):
        print(f"Making rocket transparent from {rocket_path}...")
        img = Image.open(rocket_path).convert("RGBA")
        width, height = img.size
        pixels = img.load()
        
        # Detect background colors from corners
        corner_colors = []
        for x in [0, width - 1]:
            for y in [0, height - 1]:
                r, g, b, a = pixels[x, y]
                corner_colors.append((r, g, b))
                
        for offset in [8, 16, 24]:
            if offset < width:
                r, g, b, a = pixels[offset, 0]
                corner_colors.append((r, g, b))
                
        unique_bg = list(set(corner_colors))
        print("Detected background colors:", unique_bg)
        
        visited = set()
        queue = []
        
        for x in range(width):
            queue.append((x, 0))
            queue.append((x, height - 1))
            visited.add((x, 0))
            visited.add((x, height - 1))
        for y in range(height):
            queue.append((0, y))
            queue.append((width - 1, y))
            visited.add((0, y))
            visited.add((width - 1, y))
            
        def is_bg_color(r, g, b):
            for br, bg, bb in unique_bg:
                if abs(r - br) < 15 and abs(g - bg) < 15 and abs(b - bb) < 15:
                    return True
            max_val = max(r, g, b)
            min_val = min(r, g, b)
            if max_val - min_val < 10:
                if (240 <= r <= 255) or (190 <= r <= 215) or (220 <= r <= 235):
                    return True
            return False
            
        head = 0
        while head < len(queue):
            cx, cy = queue[head]
            head += 1
            
            for nx, ny in [(cx-1, cy), (cx+1, cy), (cx, cy-1), (cx, cy+1)]:
                if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                    r, g, b, a = pixels[nx, ny]
                    if is_bg_color(r, g, b):
                        visited.add((nx, ny))
                        queue.append((nx, ny))
                        
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                if (x, y) in visited:
                    pixels[x, y] = (0, 0, 0, 0)
                else:
                    pixels[x, y] = (r, g, b, 255)
                    
        img.save(rocket_path, "PNG")
        img.save(rocket_assets_path, "PNG")
        print("Successfully made rocket transparent!")
    else:
        print("No rocket source file found to make transparent.")

def convert_all_pdfs_to_pngs():
    # Target PDF directory
    brain_dir = "C:/Users/jilla/.gemini/antigravity-ide/brain/1b087bc0-de1f-467e-8bf9-a21cdc157e7c"
    
    import glob
    pdf_files = glob.glob(os.path.join(brain_dir, "*.pdf"))
    if not pdf_files:
        print("No PDF files found in the brain directory.")
        return

    print(f"Found {len(pdf_files)} PDF files to process.")

    # Create destination directories if they don't exist
    os.makedirs("public/lovable-uploads", exist_ok=True)
    os.makedirs("src/assets", exist_ok=True)

    print("Attempting to convert PDFs to PNGs...")
    try:
        import fitz  # PyMuPDF
    except ImportError:
        print("PyMuPDF (fitz) is missing. Installing automatically via pip...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "pymupdf"])
            import fitz
        except Exception as install_err:
            print(f"Failed to install pymupdf: {install_err}")
            return

    for p in pdf_files:
        try:
            doc = fitz.open(p)
            text = ""
            for page in doc:
                text += page.get_text()

            # Match course title to decide filename
            name_key = None
            if "Core Java" in text and "Specialization" in text:
                name_key = "core-java-specialization-cert"
            elif "IBM RAG and Agentic AI" in text or "al-cert/MX77TKWHN9UX" in text:
                name_key = "ibm-rag-agentic-ai-cert"
            elif "Building AI Agents and Agentic Workflows" in text or "specialization/C2CNKX4UJRI3" in text:
                name_key = "agentic-cert"
            elif "CrewAI" in text and "BeeAI" in text:
                name_key = "agentic-ai-frameworks-cert"
            elif "LangChain" in text and "LangGraph" in text:
                name_key = "agentic-ai-langchain-langgraph-cert"
            elif "Advanced RAG" in text:
                name_key = "advanced-rag-cert"
            elif "Multimodal" in text:
                name_key = "multimodal-gen-ai-cert"
            elif "Fundamentals of Building AI Agents" in text or "Fundamentals of Building" in text:
                name_key = "fundamentals-building-ai-agents-cert"
            elif "Build AI Agents using MCP" in text or "using MCP" in text:
                name_key = "build-ai-agents-mcp-cert"
            elif "Algorithms for Searching" in text:
                name_key = "algorithms-cert"
            elif "An Intuitive Introduction to Probability" in text:
                name_key = "probability-cert"
            elif "Cloud Virtualization" in text:
                name_key = "cloud-cert"
            elif "Power BI" in text or "Data Analysis and Visualization" in text:
                name_key = "powerbi-cert"
            elif "Building AI Agents" in text or "Agentic Workflows" in text:
                name_key = "agentic-cert"
            elif "Advanced React" in text:
                name_key = "advanced-react-cert"
            elif "Dynamic Programming" in text:
                name_key = "dynamic-programming-cert"
            elif "Data Structures" in text:
                name_key = "data-structures-cert"
            elif "Exploratory Data Analysis" in text:
                name_key = "exploratory-data-analysis-cert"
            elif "Data Mining Methods" in text:
                name_key = "data-mining-methods-cert"
            elif "Database Management" in text:
                name_key = "database-management-cert"
            elif "Multivariate" in text:
                name_key = "multivariate-calculus-cert"
            elif "Linear Algebra" in text:
                name_key = "linear-algebra-cert"
            elif "Operating Systems" in text:
                name_key = "os-fundamentals-cert"
            elif "Hierarchies" in text and "Java" in text:
                name_key = "oop-hierarchies-java-cert"
            elif "Java Class Library" in text:
                name_key = "java-class-library-cert"
            elif "Object-Oriented Programming" in text and "Java" in text:
                name_key = "intro-oop-java-cert"
            elif "Web Development" in text:
                name_key = "intro-web-dev-cert"
            elif "Data Analytics" in text:
                name_key = "intro-data-analytics-cert"
            elif "Artificial Intelligence" in text:
                name_key = "intro-ai-cert"
            elif "Introduction to Java" in text or "Introduction to" in text and "Java" in text:
                name_key = "intro-java-cert"
            elif "React Basics" in text:
                name_key = "react-basics-cert"
            elif "Renewable Energy Technology Fundamentals" in text or "Renewable Energy" in text:
                name_key = "renewable-energy-technology-fundamentals-cert"
            elif "Physics 102" in text:
                name_key = "physics-102-cert"
            elif "Develop Generative AI Applications" in text:
                name_key = "develop-generative-ai-cert"
            elif "Vector Databases for RAG" in text:
                name_key = "vector-databases-rag-cert"
            elif "Build RAG Applications" in text:
                name_key = "build-rag-applications-cert"
            else:
                # Fallback based on filename without suffix
                name_key = os.path.basename(p).replace(".pdf", "")

            png_public_path = f"public/lovable-uploads/{name_key}.png"
            png_assets_path = f"src/assets/{name_key}.png"

            # Render first page as PNG image
            page = doc.load_page(0)
            pix = page.get_pixmap(dpi=150)
            pix.save(png_public_path)
            pix.save(png_assets_path)
            print(f"Converted PDF {os.path.basename(p)} -> {name_key}.png successfully!")
        except Exception as e:
            print(f"Failed to convert PDF {os.path.basename(p)}: {e}")

    try:
        import shutil
        mockup_src = os.path.join(brain_dir, "meta_cert_1784284619574.png")
        if os.path.exists(mockup_src):
            shutil.copyfile(mockup_src, "src/assets/generic-cert.png")
            shutil.copyfile(mockup_src, "public/lovable-uploads/generic-cert.png")
            print("Successfully copied generic-cert mockup image!")
    except Exception as e:
        print(f"Failed to copy generic mockup cert: {e}")

if __name__ == "__main__":
    convert_black_to_transparent()
    try:
        make_logo_transparent()
    except Exception as e:
        print(f"Failed to make logo transparent: {e}")
    try:
        make_coffee_transparent()
    except Exception as e:
        print(f"Failed to make coffee transparent: {e}")
    try:
        make_rocket_transparent()
    except Exception as e:
        print(f"Failed to make rocket transparent: {e}")
    try:
        convert_all_pdfs_to_pngs()
    except Exception as e:
        print(f"Failed to convert certificate PDFs: {e}")
