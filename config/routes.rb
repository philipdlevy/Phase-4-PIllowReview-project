Rails.application.routes.draw do
  resources :reviews, only: [:show, :index, :create]
  resources :items, only: [:show, :index, :create]
  resources :users, only: [:show, :create]

  # Custom routes

  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
