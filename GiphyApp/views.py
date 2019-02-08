from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from GiphyApp.models import SavedGifs


def index(request):
    return render(request, 'index.html')


@login_required
def search_gifs(request):

    return render(request, 'search_gifs.html')


@login_required
def save_gif(request):
    category = request.POST['category']
    gif_url = request.POST['gif_url']
    gif = request.POST['gif']

    new_gif = SavedGifs(owner=request.user,
                        category=category,
                        gif_path=gif_url,
                        gif_url=gif)

    new_gif.save()

    return HttpResponse('')


@login_required
def profile(request):
    gifs = SavedGifs.objects.filter(owner=request.user).all()
    context_gifs = []
    for gif in gifs:
        context_gifs.append(gif)

    context = {'gifs': context_gifs}
    return render(request, 'profile.html', context)


@login_required
def search_gif_category(request):
    gifs = SavedGifs.objects.filter(owner=request.user, category=request.GET['category']).all()
    context_gifs = []
    for gif in gifs:
        saved_gifs = {'gif_path': gif.gif_path,
                      'gif_url': gif.gif_url}
        context_gifs.append(saved_gifs)

    return JsonResponse(context_gifs, safe=False)
