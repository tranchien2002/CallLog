class UserHomesController < ApplicationController
  def home
    @ticket = Ticket.new
  end

  def all_request
    @tickets = Ticket.all
  end

  def new_request
    @tickets = Ticket.where(assign_to: nil)
    render json:  {
      ticket: @tickets
    }
  end

  def inprogress_request
    @tickets = Ticket.where.not(assign_to: nil, deadline: nil, ).where("deadline >= :today",{today: Date.today.to_s})
    render json:  {
        ticket: @tickets
    }
  end

  def out_request
    @tickets = Ticket.where("deadline < :today",{today: Date.today.to_s})
    render json: {
        ticket: @tickets
    }
  end



end
