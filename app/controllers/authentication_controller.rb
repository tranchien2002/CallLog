class AuthenticationController < ApplicationController
  # return auth token once user is authenticated
  skip_before_action :authorize_request, only: :authenticate
  def authenticate
    auth_token =
        AuthenticateUser.new(params[:session][:email], params[:session][:password]).call
    hash_authen = {
        status: true,
        data: {
            token: auth_token
        },
        role: User.find_by_email(params[:session][:email]).role
    }
    render json: (hash_authen)
  end

  private

  def auth_params
    params.permit(:email, :password)
  end
end