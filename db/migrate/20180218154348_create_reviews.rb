class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.references :toilet, foreign_key: true
      t.string :rating

      t.timestamps
    end
  end
end
