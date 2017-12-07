class SessionsController < ApplicationController

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
        if(login_user.role == 1)
          redirect_to home_user_url
        elsif(login_user.role == 2)
          redirect_to home_staff_url
        else
          redirect_to home_lead_url
        end
      else
        flash[:danger] = "danger"
        render :new
      end
    end

    def destroy
      log_out if logged_in?
      redirect_to login_path
    end
end
