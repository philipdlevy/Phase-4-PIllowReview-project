Rails.application.routes.draw do
  resources :items, only: [:show, :index, :create, :destroy, :update, :filter] do
    resources :reviews, only: [:show, :index, :create, :destroy, :update]
  end
  resources :users, only: [:index, :show, :create]
  resources :reviews, only: [:show, :index, :create, :destroy, :update] do
    resources :users, only: [:index, :show, :create], shallow: true
  end

  ### Custom routes

  # sessions controller routes
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Users controller route
  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  # get "/filter", to: "items#filter"



  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
