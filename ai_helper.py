# ai_helper.py

def get_ai_summary(product_name: str, specs: dict):
    """
    Generates a summary for a given product based on its specs.
    """
    spec_highlights = ", ".join([f"{key.replace('_', ' ').title()}: {value}" for key, value in specs.items()])
    return (
        f"{product_name} is a compelling device, first released in its product line. "
        f"Key features include: {spec_highlights}. "
        "It offers a solid combination of performance and features, making it a noteworthy contender in its category."
    )