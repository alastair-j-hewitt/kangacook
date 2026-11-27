from rest_framework import serializers

from .models import Recipe


class RecipeSerializer(serializers.ModelSerializer):
    """Recipe as JSON, with ingredients also exposed as a list for the frontend."""

    ingredients_list = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = ["id", "title", "ingredients", "ingredients_list", "instructions"]

    def get_ingredients_list(self, obj: Recipe) -> list[str]:
        cleaned: list[str] = []
        for part in obj.ingredients.split(","):
            stripped = part.strip()
            if stripped:
                cleaned.append(stripped)
        return cleaned
