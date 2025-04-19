list_products_params = [
            {
                "name": "page",
                "in": "query",
                "description": "Page number (default: 1)",
                "required": False,
                "schema": {"type": "integer"},
            },
            {
                "name": "page_size",
                "in": "query",
                "description": "Number of items per page (default: 10, max: 100)",
                "required": False,
                "schema": {"type": "integer"},
            },
            {
                "name": "location",
                "in": "query",
                "description": "Filter products by location ('JO' or 'SA')",
                "required": False,
                "schema": {"type": "string", "enum": ["JO", "SA"]},
            },
]