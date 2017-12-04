class SessionsController < ApplicationController

    def new
        @user = User.new

    end


    def create
      login_user = User.find_by(email: params[:session][:email].downcase)
      if login_user && login_user.authenticate(params[:session][:password])
        flash[:success] = "asdf"
        log_in(login_user)
        remember login_user
        redirect_to login_user
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
