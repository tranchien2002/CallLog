class TicketsController < ApplicationController
  before_action :validate_role, only: [:tickets_all,:ticket_new,:tickets_feedback,:tickets_inprogress,:tickets_out,:tickets_closed]
  def new
    @ticket = Ticket.new
  end

  def create
    if !current_user.nil?
      @ticket = Ticket.new(ticket_params)
      @ticket.requester = current_user.id
      @ticket.status = 1
      @ticket.assign_to = params[:ticket][:team_id]
      @ticket.save
      @ticket.comments.create(content: params[:ticket][:content], user_id: current_user.id)
      params[:ticket][:rela].each do |p|
        @ticket.relations.create(user_id: p)
      end
      if @ticket
        render json:{
            status: "success"
        }
      else
        render json:{
            status: "fails"
        }
      end
    else
      render json: {
          status: "access denied"
      }
    end

  end

  def show
    ticket = Ticket.find(params[:id])
    comment = ticket.comments
    users_id = User.where(team_id: current_user.team_id)
    render json: {
        data: {
            ticket: ticket.as_json(only: [:id,:subject,:priority,:deadline,:status,:team_id], include: {staff: {only: :name},customer: {only: :name}}),
            time: ticket.created_at.to_s,
            comments: comment.as_json(only: [:content],include: {user: {only: :name}}),
            staff: users_id.as_json(only: [:id],methods: :text)
        }
    }
  end

  def update
    if !current_user.nil?
      @ticket = Ticket.find(params[:id])
      if @ticket.update_attributes(ticket_params)
        render json:{
            status: "success"
        }
      else
        render json:{
            status: "fails"
        }
      end
    end

  end

  def staff_team
    users_id = User.where(team_id: params[:team_id])
    render json: {
        results: users_id.as_json(only: [:id],methods: :text)
    }
  end

  def tickets_all
    tickets = Ticket.all
    render json: {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status,:team_id], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def tickets_new
    tickets = Ticket.where("deadline >= :today AND status = :status",{today: Date.today.to_s,status: 1})
    render json:  {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status,:team_id], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def tickets_inprogress
    tickets = Ticket.where("deadline >= :today AND status = :status",{today: Date.today.to_s,status: 2})
    render json:  {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status,:team_id], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def tickets_feedback
    tickets = Ticket.where("deadline >= :today AND status = :status",{today: Date.today.to_s,status: 3})
    render json:  {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status,:team_id], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def tickets_out
    tickets = Ticket.where("deadline < :today AND status <> :status",{today: Date.today.to_s,status: 6})
    # tickets = Ticket.where(st)
    render json: {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status,:team_id], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def tickets_closed
    tickets = Ticket.where(status: 6)
    render json:  {
        data: tickets.as_json(only: [:id,:subject,:priority,:deadline,:status,:team_id], include: {staff: {only: :name},customer: {only: :name}})
    }
  end

  def staff_update
    users_id = User.where(team_id: current_user.team_id)
    render json: {
        results: users_id.as_json(only: [:id],methods: :text)
    }
  end

  private

  def ticket_params
    params.require(:ticket).permit(:subject,:priority,:deadline,:status,:assign_to,:team_id)
  end

  def validate_role
    if current_user.role != 4
      render json: {
          data: "Access denied"
      }
    end
  end
end
