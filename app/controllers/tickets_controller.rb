class TicketsController < ApplicationController
  def new
    @ticket = Ticket.new
  end

  def create
    if logged_in?
      @ticket = Ticket.new(ticket_params)
      @ticket.team_id = params[:ticket][:team]
      if @ticket.save

      else

      end
    else
      redirect_to login_path
    end

  end

  def show
    @ticket = Ticket.find(params[:id])
  end

  def edit
    @ticket = Ticket.find(params[:id])
  end

  def update

  end

  def index
    @tickets = Ticket.all
    @ticket = Ticket.find(params[:id])
  end

  private

  def ticket_params
    params.require(:ticket).permit(:subject,:priority,:deadline)
  end
end
