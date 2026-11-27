from django.views.generic import DetailView, ListView
from rest_framework import filters, generics

from .models import Recipe
from .serializers import RecipeSerializer


# Server-rendered HTML pages


class RecipeListView(ListView):
    model = Recipe
    template_name = "recipes/recipe_list.html"
    context_object_name = "recipes"
    ordering = ["title"]


class RecipeDetailView(DetailView):
    model = Recipe
    template_name = "recipes/recipe_detail.html"
    context_object_name = "recipe"


# JSON API used by the React frontend


class RecipeListAPIView(generics.ListAPIView):
    """GET /api/recipes/?search=<text> searches titles and ingredients."""

    queryset = Recipe.objects.order_by("title")
    serializer_class = RecipeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "ingredients"]


class RecipeDetailAPIView(generics.RetrieveAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
