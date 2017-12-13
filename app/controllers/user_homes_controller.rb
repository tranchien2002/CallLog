class UserHomesController < ApplicationController
  # skip_before_action :authorize_request, only: :all_request
  def home
    @ticket = Ticket.new
  end

  def all_request

    tickets = Ticket.where("requester = ?", current_user.id )
    render json: {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def new_request
    # tickets = Ticket.where(status: 1, requester: current_user.id)
    tickets = Ticket.where("deadline >= :today AND requester = :requester AND status = :status",{today: Date.today.to_s, requester: current_user.id,status: 1})
    render json:  {
      data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def inprogress_request
    # tickets = Ticket.where.not(status: 2, deadline: nil, ).where("deadline >= :today AND requester = :requester",{today: Date.today.to_s, requester: current_user.id})
    # tickets = Ticket.where(status: 2, requester: current_user.id)
    tickets = Ticket.where("deadline >= :today AND requester = :requester AND status = :status",{today: Date.today.to_s, requester: current_user.id,status: 2})
    render json:  {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def resolved_request
    tickets = Ticket.where("deadline >= :today AND requester = :requester AND status = :status",{today: Date.today.to_s, requester: current_user.id,status: 4})
    render json:  {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def out_request
    tickets = Ticket.where("deadline < :today AND requester = :requester AND status <> :status",{today: Date.today.to_s, requester: current_user.id,status: 6})
    # tickets = Ticket.where(st)
    render json: {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status], include: {staff: {only: :name},customer: {only: :name}})
    }
  end



end
