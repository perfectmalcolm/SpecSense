import re

def parse_storage_ram(memory_str):
    """
    Parses GSMArena memory string like "128GB 8GB RAM, 256GB 12GB RAM"
    Returns a list of tuples: [(128, 8), (256, 12)]
    """
    if not memory_str:
        return []
    
    variants = []
    # Split by comma
    parts = memory_str.split(',')
    
    for part in parts:
        # Extract storage
        storage_match = re.search(r'(\d+)\s*([GT]B)', part, re.IGNORECASE)
        storage_val = 0
        if storage_match:
            val = int(storage_match.group(1))
            unit = storage_match.group(2).upper()
            if unit == 'TB':
                val *= 1024
            storage_val = val
            
        # Extract RAM
        ram_match = re.search(r'(\d+)\s*GB\s*RAM', part, re.IGNORECASE)
        ram_val = 0
        if ram_match:
            ram_val = int(ram_match.group(1))
            
        if storage_val > 0:
            variants.append({'storage': storage_val, 'ram': ram_val})
            
    return variants

def verify_listing(listing, official_specs):
    """
    Verifies a single listing against official specs.
    Returns: verified (bool), reason (str)
    """
    if not official_specs or 'specs' not in official_specs:
        return True, "No official specs to compare"
    
    specs = official_specs['specs']
    storage_ram_str = specs.get('storage_ram', '') or specs.get('internal_memory', '')
    
    official_variants = parse_storage_ram(storage_ram_str)
    
    if not official_variants:
        return True, "Could not parse official memory specs"
        
    title = listing.get('title', '').lower()
    desc = listing.get('description', '').lower()
    full_text = f"{title} {desc}"
    
    # Extract listing storage
    # Look for patterns like "128gb", "256 gb"
    # We find all matches to see if ANY match the official variants
    
    found_storage = []
    matches = re.findall(r'(\d+)\s*([gt]b)', full_text)
    for val, unit in matches:
        v = int(val)
        if unit.lower() == 'tb':
            v *= 1024
        # Filter out small numbers that might not be storage (e.g. 5g, 4g network)
        # Assuming storage usually >= 32GB for modern phones
        if v >= 32: 
            found_storage.append(v)
            
    if not found_storage:
        return True, "No storage info found in listing"
        
    # Check if any found storage matches any official variant
    # We only check storage for now as RAM is often omitted or harder to parse distinctively
    
    valid_storages = [v['storage'] for v in official_variants]
    
    is_match = False
    for s in found_storage:
        if s in valid_storages:
            is_match = True
            break
            
    if is_match:
        return True, "Specs match official variants"
    else:
        # Construct a readable list of valid storages
        valid_str = ", ".join([f"{v}GB" for v in valid_storages])
        return False, f"Storage mismatch. Listing implies {found_storage[0]}GB but official variants are: {valid_str}"

