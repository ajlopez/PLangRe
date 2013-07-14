#!/usr/bin/env ruby
 
class Routes
  def distance(*segments)
    calculate_distance(*segments)
  end
  
private  
  def calculate_distance(*segments)
    puts "Expensive Task"
    segments.inject { |sum, val| sum + val }
  end
end  
 
 
r = Routes.new
puts r.distance 1,2,3,4
puts r.distance 1,2,3,4
puts r.distance 9,8,7,6
puts r.distance 9,8,7,6