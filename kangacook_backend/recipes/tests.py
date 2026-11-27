from django.test import TestCase
from django.urls import reverse

from .models import Recipe


class RecipePagesTests(TestCase):
    def setUp(self) -> None:
        self.recipe = Recipe.objects.create(
            title="Pancakes",
            ingredients="flour, milk, eggs",
            instructions="Mix.\nCook.",
        )

    def test_list_page_renders_titles(self) -> None:
        response = self.client.get(reverse("recipe-list"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Pancakes")

    def test_detail_page_renders_recipe(self) -> None:
        response = self.client.get(reverse("recipe-detail", args=[self.recipe.pk]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "flour, milk, eggs")


class RecipeApiTests(TestCase):
    def setUp(self) -> None:
        self.pancakes = Recipe.objects.create(
            title="Pancakes", ingredients="flour, milk, eggs", instructions="Mix. Cook."
        )
        self.salad = Recipe.objects.create(
            title="Salad", ingredients="lettuce, tomato", instructions="Toss."
        )

    def test_list_returns_all_recipes(self) -> None:
        response = self.client.get(reverse("api-recipe-list"))
        self.assertEqual(response.status_code, 200)
        titles = [item["title"] for item in response.json()]
        self.assertEqual(titles, ["Pancakes", "Salad"])

    def test_search_filters_by_ingredient(self) -> None:
        response = self.client.get(reverse("api-recipe-list"), {"search": "tomato"})
        titles = [item["title"] for item in response.json()]
        self.assertEqual(titles, ["Salad"])

    def test_detail_exposes_ingredients_as_list(self) -> None:
        response = self.client.get(reverse("api-recipe-detail", args=[self.pancakes.pk]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["ingredients_list"], ["flour", "milk", "eggs"])

    def test_unknown_recipe_returns_404(self) -> None:
        response = self.client.get(reverse("api-recipe-detail", args=[9999]))
        self.assertEqual(response.status_code, 404)
