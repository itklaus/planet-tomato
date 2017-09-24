Rails.application.routes.draw do
  root 'welcome#index'
  get  '/signup', to: 'users#new'
  post '/signup',  to: 'users#create'
  resources :users
end
