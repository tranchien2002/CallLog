class LeadHomesController < ApplicationController
  before_action :validate_role_lead
  def home

  end

  def all_request
    tickets = Ticket.where("team_id = ?", current_user.team_id )
    render json: {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status,:team_id], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def new_request
    # tickets = Ticket.where(status: 1, team_id: current_user.team_id)
    tickets = Ticket.where("deadline >= :today AND team_id = :team_id AND status = :status",{today: Date.today.to_s, team_id: current_user.team_id,status: 1})
    render json:  {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status,:team_id], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def inprogress_request
    # tickets = Ticket.where.not(status: 2, deadline: nil, ).where("deadline >= :today AND requester = :requester",{today: Date.today.to_s, requester: current_user.id})
    # tickets = Ticket.where(status: 2, team_id: current_user.team_id)
    tickets = Ticket.where("deadline >= :today AND team_id = :team_id AND status = :status",{today: Date.today.to_s, team_id: current_user.team_id,status: 2})
    render json:  {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def feedback_request
    # tickets = Ticket.where(status: 3, team_id: current_user.team_id)
    tickets = Ticket.where("deadline >= :today AND team_id = :team_id AND status = :status",{today: Date.today.to_s, team_id: current_user.team_id,status: 3})
    render json:  {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def out_request
    tickets = Ticket.where("deadline < :today AND team_id = :team_id AND status <> :status",{today: Date.today.to_s, team_id: current_user.team_id,status: 6})
    # tickets = Ticket.where(st)
    render json: {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def closed_request
    tickets = Ticket.where(status: 6,team_id: current_user.team_id)
    render json:  {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status], include: {staff: {only: :name},customer: {only: :name}})
    }
  end
  private
  def validate_role_lead
    if current_user.role < 3
      render json: {
          data: "Access denied"
      }
    end
  end
end
