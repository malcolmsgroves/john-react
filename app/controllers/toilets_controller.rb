class ToiletsController < ApplicationController
  def create

  end

  def index
    render json: Toilet.nearby(params[:lat], params[:lng]).limit(10);
  end

  private

    def toilet_params
      puts params
    end

end
