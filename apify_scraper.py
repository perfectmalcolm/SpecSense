import os
from apify_client import ApifyClient

async def run_gsmarena_scraper(api_token: str):
    """
    Runs the GSMArena scraper actor and retrieves its results.
    """
    if not api_token:
        print("Error: Apify API token not provided.")
        return []

    apify_client = ApifyClient(api_token)

    actor_id = "deloni/gsmarena-article-scraper"
    print(f"Running actor: {actor_id}...")

    # The input for this actor is likely empty, but you can pass one if needed.
    # We will run it with an empty input for now.
    run_input = {}

    run = await apify_client.actor(actor_id).call(run_input=run_input)

    if run is None:
        print('Actor run failed or returned no result.')
        return []

    print(f"Actor run finished with status: {run['status']}")

    dataset_client = apify_client.dataset(run['defaultDatasetId'])
    list_items_result = await dataset_client.list_items()

    print(f"Retrieved {len(list_items_result.items)} items from the dataset.")
    return list_items_result.items
