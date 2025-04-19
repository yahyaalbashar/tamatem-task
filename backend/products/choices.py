from django.db.models import TextChoices
from django.utils.translation import gettext_lazy as _


class CountryChoices(TextChoices):
    JORDAN = "JO", _("Jordan")
    SAUDIARAIA = "SA", _("Saudi Arabia")