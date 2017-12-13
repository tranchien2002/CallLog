Rails.application.routes.draw do
  root "sessions#new"
  get "/login", to: "sessions#new"
  post "/login", to: "sessions#create" 
  delete "/logout", to: "sessions#destroy"
  get "home_lead", to: "lead_homes#home"
  get "home_staff", to: "staff_homes#home"
  get "home_user", to: "user_homes#home"
  resources :tickets
  post "staff_team", to: "tickets#staff_team"
  get "staff_update", to: "tickets#staff_update"
  resources :users
  resources :comments

  post 'auth/login', to: 'authentication#authenticate'


  # home for user
  get "user_all_request", to: "user_homes#all_request"
  get "user_new_request", to: "user_homes#new_request"
  get "user_inprogress_request", to: "user_homes#inprogress_request"
  get "user_out_request", to: "user_homes#out_request"
  get "user_resolved_request", to: "user_homes#resolved_request"
  #home for lead
  get "lead_all_request", to: "lead_homes#all_request"
  get "lead_new_request", to: "lead_homes#new_request"
  get "lead_inprogress_request", to: "lead_homes#inprogress_request"
  get "lead_out_request", to: "lead_homes#out_request"
  get "lead_closed_request", to: "lead_homes#closed_request"
  get "lead_feedback_request", to: "lead_homes#feedback_request"

  #home for staff
  get "rela_all_request", to: "staff_homes#rela_all_request"
  get "rela_new_request", to: "staff_homes#rela_new_request"
  get "rela_inprogress_request", to: "staff_homes#rela_inprogress_request"
  get "rela_out_request", to: "staff_homes#rela_out_request"
  get "rela_resolved_request",to: "staff_homes#rela_resolved_request"

  get "staff_all_request", to: "staff_homes#all_request"
  get "staff_new_request", to: "staff_homes#new_request"
  get "staff_inprogress_request", to: "staff_homes#inprogress_request"
  get "staff_feedback_request", to: "staff_homes#feedback_request"
  get "staff_out_request", to: "staff_homes#out_request"

  #tickets
  get "tickets_all", to: "tickets#tickets_all"
  get "tickets_new", to: "tickets#tickets_new"
  get "tickets_inprogress", to: "tickets#tickets_inprogress"
  get "tickets_feedback", to: "tickets#tickets_feedback"
  get "tickets_out", to: "tickets#tickets_out"
  get "tickets_closed", to: "tickets#tickets_closed"
end
