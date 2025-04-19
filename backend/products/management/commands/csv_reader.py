import csv
from django.core.management.base import BaseCommand
from products.models import Product

class Command(BaseCommand):
    """
    A Base command to import items.csv file and dump the data into the Products table.
    """
    help = 'Import product data from a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to the CSV file')

    def handle(self, *args, **kwargs):
        csv_file_path = kwargs['csv_file']

        try:
            with open(csv_file_path, mode='r') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    # Validate and clean data
                    try:
                        product = Product(
                            id=int(row['id']),
                            title=row['title'],
                            description=row['description'],
                            price=float(row['price']),
                            location=row['location']
                        )
                        product.save()
                        self.stdout.write(self.style.SUCCESS(f"Added product: {product.title}"))
                    except Exception as e:
                        self.stderr.write(self.style.ERROR(f"Error adding product {row['id']}: {e}"))

            self.stdout.write(self.style.SUCCESS("CSV import completed successfully."))
        except FileNotFoundError:
            self.stderr.write(self.style.ERROR(f"File not found: {csv_file_path}"))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"An error occurred: {e}"))