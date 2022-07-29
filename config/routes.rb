Rails.application.routes.draw do
  resources :reviews, only: [:show, :index, :create, :destroy]
  resources :items, only: [:show, :index, :create, :destroy]
  resources :users, only: [:show, :create]

  ### Custom routes

  # sessions controller routes
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Users controller route
  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
