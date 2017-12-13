class CommentsController < ApplicationController
  def create
    if !current_user.nil?
      comment = Comment.new(comment_params)
      comment.user_id = current_user.id
      if comment.save
        render json: {
            name: current_user.name
        }
      end
    else
      render json: {
          status: "access denied"
      }
    end
  end

  def update
    if !current_user.nil?
      comment = comment.find(params[:id])
      if comment.update_attributes(ticket_params)
        render json:{
            status: "success"
        }
      else
        render json:{
            status: "failsomment"
        }
      end
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:content, :ticket_id)
  end
end
