class ToiletsController < ApplicationController
  WillPaginate.per_page = 10

  def create
    toilet = Toilet.new(toilet_params)
    if toilet.save!
      toilet.reviews.create!(rating: params[:rating])
    end
  end

  def index
    toilets = Toilet.nearby(params[:lat], params[:lng]).paginate(page: params[:page])
    toilet_list = toilets.map do |toilet|
      new_toilet = toilet.attributes
      new_toilet[:average_rating] = toilet.average_rating
      new_toilet
    end
    render json: toilet_list
  end

  private

    def toilet_params
      params.require(:toilet).permit(:name, :description, :lat, :lng, :toilet_type)
    end

end
