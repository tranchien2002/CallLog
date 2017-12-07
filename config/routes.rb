Rails.application.routes.draw do

  

  root "sessions#new"
  get "/login", to: "sessions#new"
  post "/login", to: "sessions#create" 
  delete "/logout", to: "sessions#destroy"
  get "home_lead", to: "lead_homes#home"
  get "home_staff", to: "staff_homes#home"
  get "home_user", to: "user_homes#home"
  resources :tickets
  resources :users

#   home for user
  get "user_new_request", to: "user_homes#new_request"
  get "user_inprogress_request", to: "user_homes#inprogress_request"
  get "user_out_request", to: "user_homes#out_request"

end
