class StaffHomesController < ApplicationController
  def home

  end
  def all_request
    tickets = Ticket.where("assign_to = ?", current_user.id )
    render json: {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def new_request
    # tickets = Ticket.where(status: 1, assign_to: current_user.id)
    tickets = Ticket.where("deadline >= :today AND assign_to = :assign_to AND status = :status",{today: Date.today.to_s, assign_to: current_user.id,status: 1})
    render json:  {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def inprogress_request
    # tickets = Ticket.where.not(status: 2, deadline: nil, ).where("deadline >= :today AND requester = :requester",{today: Date.today.to_s, requester: current_user.id})
    # tickets = Ticket.where(status: 2, assign_to: current_user.id)
    tickets = Ticket.where("deadline >= :today AND assign_to = :assign_to AND status = :status",{today: Date.today.to_s, assign_to: current_user.id,status: 2})
    render json:  {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def feedback_request
    tickets = Ticket.where("deadline >= :today AND assign_to = :assign_to AND status = :status",{today: Date.today.to_s, assign_to: current_user.id,status: 3})
    render json:  {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def out_request
    tickets = Ticket.where("deadline < :today AND assign_to = :assign_to AND status <> :status",{today: Date.today.to_s, assign_to: current_user.id,status: 6})
    # tickets = Ticket.where(st)
    render json: {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status], include: {staff: {only: :name},customer: {only: :name}})
    }
  end


  def rela_all_request
    tickets = Ticket.joins(:relations).where("relations.user_id" => current_user.id)
    render json: {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def rela_new_request
    # tickets = Ticket.joins("INNER JOIN relations ON tickets.id = relations.ticket_id")
    # tickets = Ticket.joins(:relations).where(status: 1).where("relations.user_id" => current_user.id)
    tickets = Ticket.joins(:relations).where("deadline >= :today AND status = :status",{today: Date.today.to_s,status: 1}).where("relations.user_id" => current_user.id)
    render json: {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def rela_inprogress_request
    # tickets = Ticket.joins(:relations).where(status: 2).where("relations.user_id" => current_user.id)
    tickets = Ticket.joins(:relations).where("deadline >= :today AND status = :status",{today: Date.today.to_s,status: 2}).where("relations.user_id" => current_user.id)
    render json: {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def rela_out_request
    tickets = Ticket.joins(:relations).where("deadline < :today AND status <> :status",{today: Date.today.to_s,status: 6}).where("relations.user_id" => current_user.id)
    render json: {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def rela_resolved_request
    tickets = Ticket.joins(:relations).where("deadline >= :today AND status = :status",{today: Date.today.to_s,status: 4}).where("relations.user_id" => current_user.id)
    # tickets = Ticket.joins(:relations).where(status: 4).where("relations.user_id" => current_user.id)
    render json:  {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status], include: {staff: {only: :name},customer: {only: :name}})
    }
  end


end
