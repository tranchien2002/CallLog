class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include SessionsHelper
  include Response
  include ExceptionHandler
  # include ActionController::Serialization

  # called before every action on controllers
  before_action :authorize_request
  attr_reader :current_user
  skip_before_action :verify_authenticity_token
  private

  # Check for valid request token and return user
  def authorize_request
    @current_user = (AuthorizeApiRequest.new(request.headers).call)[:user]
  end
end
