import os
import re

def remove_comments(content, ext):
    if ext in ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss']:
        # Regex to match strings and comments
        # Group 1: Strings (to be preserved)
        # Group 2: Comments (to be removed)
        pattern = r'(\"(?:\\\\|\\\"|[^\"])*\"|\'(?:\\\\|\\\'|[^\'])*\'|`(?:\\\\|\\`|[^`])*`)|(/\*[\s\S]*?\*/|//.*)'
        
        def replacer(match):
            if match.group(2): # If it's a comment
                return ""
            else: # If it's a string
                return match.group(1)
        
        return re.sub(pattern, replacer, content)
    return content

def process_directory(directory):
    excluded_dirs = {'.git', 'node_modules', '.next', 'dist', 'build', 'out'}
    allowed_extensions = {'.ts', '.tsx', '.js', '.jsx', '.css', '.scss'}
    
    for root, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if d not in excluded_dirs]
        
        for file in files:
            ext = os.path.splitext(file)[1]
            if ext in allowed_extensions:
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = remove_comments(content, ext)
                    
                    if new_content != content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Processed: {filepath}")
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")

if __name__ == "__main__":
    process_directory('c:\\Users\\Marvan\\Desktop\\BePositive.az')
