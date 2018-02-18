class CreateToilets < ActiveRecord::Migration[5.1]
  def change
    create_table :toilets do |t|
      t.decimal :lat
      t.decimal :lng
      t.string :name
      t.text :description
      t.string :type

      t.timestamps
    end
  end
end
