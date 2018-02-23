class ReviewsController < ApplicationController

  def create
    Review.create!(review_params)
  end

  private
    def review_params
      params.require(:review).permit(:toilet_id, :rating)
    end

end
