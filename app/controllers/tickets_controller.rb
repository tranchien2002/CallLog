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
    if logged_in?
      @ticket = Ticket.find(params[:id])
      if @ticket.update_attributes(ticket_params)
        redirect_to tickets_url
      else

      end
    else
      redirect_to login_path
    end

  end

  def index
    @tickets = Ticket.all
    # @tickets.each do |t|
    #   t.name = t.Ticket.find(t.id).subject
    # end
    render json: {
       ticket: @tickets
    }
  end

  private

  def ticket_params
    params.require(:ticket).permit(:subject,:priority,:deadline)
  end
end
