#!/usr/bin/env ruby
 
# Uses the Microsoft Translator API to draft a translated version of an Objective-C strings file.
# USAGE: translate-strings <FILEPATH> <NEW_LANG_CODE>
# NOTE: must have a config.yml file next to this script with `client_id` and `client_secret`
#       defined as keys (and their respective values).
 
require 'uri'
require 'httparty'
require 'nokogiri'
require 'yaml'
require 'json'
 
BASE_URI = 'http://api.microsofttranslator.com/v2/Http.svc/Translate'
 
# 1. Use client ID/secret to get access token.
 
filepath, language = ARGV
 
class Translate
  include HTTParty
  base_uri 'http://api.microsofttranslator.com'
  format :xml
  # debug_output
 
  def config
    YAML::load File.read(File.join(File.dirname(__FILE__), 'config.yml'))
  end
 
  def initialize
    @scope = "/v2/Http.svc/Translate"
    body = {
      grant_type: 'client_credentials', client_id: URI.encode(self.config['client_id']),
      client_secret: URI.encode(self.config['client_secret']), scope: self.class.base_uri
    }
    response = self.class.post 'https://datamarket.accesscontrol.windows.net/v2/OAuth2-13', body: body
    @token = JSON.load(response.body)['access_token']
  end
 
  def authorized?
    !@token.nil?
  end
 
  def headers
    { "Authorization" => "Bearer #{@token}" }
  end
 
  def parse(text)
    ::Nokogiri::XML(text)
  end
 
  def translate(text, from_lang, to_lang)
    return nil unless self.authorized?
    opts = { headers: self.headers, query: { text: text, from: from_lang, to: to_lang } }
    response = self.class.get '/v2/Http.svc/Translate', opts
    self.parse(response.body).content
  end
end
 
tranny = Translate.new
puts tranny.translate 'Andrew Barrows is a weird guy.', 'en', 'es'