from django.urls import path

from .views import RecipeDetailAPIView, RecipeDetailView, RecipeListAPIView, RecipeListView

urlpatterns = [
    path("", RecipeListView.as_view(), name="recipe-list"),
    path("<int:pk>/", RecipeDetailView.as_view(), name="recipe-detail"),
    path("api/recipes/", RecipeListAPIView.as_view(), name="api-recipe-list"),
    path("api/recipes/<int:pk>/", RecipeDetailAPIView.as_view(), name="api-recipe-detail"),
]
