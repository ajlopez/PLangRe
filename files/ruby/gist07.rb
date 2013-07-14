def inline_js_and_css(html)
  require 'open-uri'
 
  doc = Nokogiri::HTML html
  doc.css('link[rel=stylesheet]').each do |node|
    new_node = doc.create_element 'style'
    new_node.content = open(node['href']).read
    node.replace new_node
  end
  doc.css('script[src^=http]').each do |node|
    new_node = doc.create_element 'script'
    new_node['type'] = 'text/javascript'
    new_node.content = open(node['src']).read
    node.replace new_node
  end
  doc.to_html
end