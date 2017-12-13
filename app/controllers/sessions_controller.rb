class SessionsController < ApplicationController

    skip_before_action :authorize_request, only: [:new, :create]


    def new
      # if logged_in?
      #   redirect_to tickets_url
      # end
      #   @user = User.new

    end


    def create
      login_user = User.find_by(email: params[:session][:email].downcase)
      if login_user && login_user.authenticate(params[:session][:password])
        log_in(login_user)
        remember login_user
        render json:{
            status: true,
            role: login_user.role
        }
      else
        flash[:danger] = "danger"
        render :new
      end
    end

    def destroy
      log_out if logged_in?
      redirect_to login_path
    end

    #api
    # def create
    #   user_password = params[:session][:password]
    #   user_email = params[:session][:email]
    #   user = user_email.present? && User.find_by(email: user_email)
    #
    #   if user.valid_password? user_password
    #     sign_in user, store: false
    #     user.generate_authentication_token!
    #     user.save
    #     render json: user, status: 200, location: [:api, user]
    #   else
    #     render json: { errors: "Invalid email or password" }, status: 422
    #   end
    # end
    #
    #
    #
    # def destroy
    #   user = User.find_by(auth_token: params[:id])
    #   user.generate_authentication_token!
    #   user.save
    #   head 204
    # end
end
