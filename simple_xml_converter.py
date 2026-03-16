#!/usr/bin/env python3
"""
Simple WordPress XML to JSON Converter (No external dependencies)
Converts WordPress export XML to structured JSON for Mongoose backend
"""

import xml.etree.ElementTree as ET
import json
import re
from datetime import datetime
from html import unescape

class SimpleWordPressConverter:
    def __init__(self, xml_file_path):
        self.xml_file = xml_file_path
        self.namespaces = {
            'wp': 'http://wordpress.org/export/1.2/',
            'content': 'http://purl.org/rss/1.0/modules/content/',
            'excerpt': 'http://wordpress.org/export/1.2/excerpt/',
            'dc': 'http://purl.org/dc/elements/1.1/'
        }
        self.posts = []
        
    def parse_and_convert(self):
        """Parse XML and convert to categorized JSON"""
        print("Parsing WordPress XML file...")
        try:
            tree = ET.parse(self.xml_file)
            root = tree.getroot()
            
            # Extract posts
            items = root.findall('.//item')
            
            for item in items:
                post_type = item.find('wp:post_type', self.namespaces)
                status = item.find('wp:status', self.namespaces)
                
                # Only process published posts
                if (post_type is not None and post_type.text == 'post' and 
                    status is not None and status.text == 'publish'):
                    
                    post_data = self._extract_post_data(item)
                    if post_data:
                        self.posts.append(post_data)
            
            print(f"Extracted {len(self.posts)} published posts")
            
            # Categorize posts
            categorized = self.categorize_posts()
            return categorized
            
        except Exception as e:
            print(f"Error parsing XML: {e}")
            return None
    
    def _extract_post_data(self, item):
        """Extract individual post data"""
        try:
            # Basic post information
            title = item.find('title')
            link = item.find('link')
            content = item.find('content:encoded', self.namespaces)
            excerpt = item.find('excerpt:encoded', self.namespaces)
            
            # WordPress specific data
            post_id = item.find('wp:post_id', self.namespaces)
            post_date = item.find('wp:post_date', self.namespaces)
            post_name = item.find('wp:post_name', self.namespaces)
            
            # Categories
            categories = []
            for category in item.findall('category'):
                domain = category.get('domain', '')
                nicename = category.get('nicename', '')
                cat_text = category.text if category.text else ''
                
                if domain == 'category':
                    categories.append({
                        'name': cat_text,
                        'slug': nicename
                    })
            
            # Clean content
            content_text = content.text if content is not None else ''
            content_clean = self._clean_content(content_text)
            excerpt_clean = self._clean_content(excerpt.text if excerpt is not None else '')
            
            return {
                'id': post_id.text if post_id is not None else '',
                'title': unescape(title.text) if title is not None else '',
                'slug': post_name.text if post_name is not None else '',
                'content': content_clean,
                'excerpt': excerpt_clean,
                'publish_date': self._parse_date(post_date.text) if post_date is not None else None,
                'categories': categories,
                'original_url': link.text if link is not None else ''
            }
            
        except Exception as e:
            print(f"Error extracting post data: {e}")
            return None
    
    def _clean_content(self, content):
        """Clean HTML content"""
        if not content:
            return ''
        
        # Unescape HTML entities
        content = unescape(content)
        
        # Remove HTML comments and WordPress blocks
        content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
        content = re.sub(r'<!-- wp:.*?-->', '', content, flags=re.DOTALL)
        content = re.sub(r'<!-- /wp:.*?-->', '', content, flags=re.DOTALL)
        
        # Remove HTML tags but keep content
        content = re.sub(r'<script.*?</script>', '', content, flags=re.DOTALL)
        content = re.sub(r'<style.*?</style>', '', content, flags=re.DOTALL)
        content = re.sub(r'<[^>]+>', '', content)
        
        # Clean up whitespace
        content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
        content = re.sub(r'&nbsp;', ' ', content)
        content = content.strip()
        
        return content
    
    def _parse_date(self, date_str):
        """Parse WordPress date format"""
        try:
            if date_str and date_str != '0000-00-00 00:00:00':
                return datetime.strptime(date_str, '%Y-%m-%d %H:%M:%S').isoformat()
        except:
            pass
        return None
    
    def categorize_posts(self):
        """Categorize posts into recipes, blog, tips, and FAQ"""
        categorized = {
            'recipes': [],
            'blog': [],
            'tips_and_tricks': [],
            'faq': []
        }
        
        for post in self.posts:
            category_type = self._determine_category(post)
            formatted_post = self._format_post_for_mongoose(post, category_type)
            categorized[category_type].append(formatted_post)
        
        return categorized
    
    def _determine_category(self, post):
        """Determine which category a post belongs to"""
        title_lower = post['title'].lower()
        content_lower = post['content'].lower()
        
        # Extract category names
        category_names = [cat['name'].lower() for cat in post['categories']]
        category_slugs = [cat['slug'].lower() for cat in post['categories']]
        
        # Check for explicit category matches first
        if any('blog' in cat or 'review' in cat for cat in category_names + category_slugs):
            return 'blog'
        
        if any('tip' in cat or 'trick' in cat or 'garnish' in cat for cat in category_names + category_slugs):
            return 'tips_and_tricks'
        
        # Check title and content for keywords
        faq_keywords = ['faq', 'question', 'answer', 'frequently asked', 'how to']
        if any(keyword in title_lower for keyword in faq_keywords):
            return 'faq'
        
        tips_keywords = ['tip', 'trick', 'hack', 'secret', 'guide', 'how to']
        if any(keyword in title_lower for keyword in tips_keywords):
            return 'tips_and_tricks'
        
        blog_keywords = ['review', 'story', 'experience', 'opinion']
        if any(keyword in title_lower for keyword in blog_keywords):
            return 'blog'
        
        # Recipe indicators
        recipe_keywords = ['recipe', 'cooking', 'dish', 'food', 'curry', 'chicken', 'mutton', 'dessert']
        if (any(keyword in title_lower for keyword in recipe_keywords) or
            any('recipe' in cat or 'food' in cat or 'chicken' in cat or 'dessert' in cat 
                for cat in category_names + category_slugs)):
            return 'recipes'
        
        # Default categorization based on content analysis
        if 'ingredient' in content_lower or 'method' in content_lower:
            return 'recipes'
        elif len(post['content']) < 300:
            return 'tips_and_tricks'
        else:
            return 'blog'
    
    def _format_post_for_mongoose(self, post, category_type):
        """Format post for Mongoose schema"""
        
        # Common fields
        formatted_post = {
            'title': post['title'],
            'slug': post['slug'] or self._slugify(post['title']),
            'content': post['content'],
            'excerpt': post['excerpt'] or (post['content'][:200] + '...' if len(post['content']) > 200 else post['content']),
            'status': 'published',
            'category': category_type,
            'publish_date': post['publish_date'],
            'created_at': post['publish_date'],
            'updated_at': datetime.now().isoformat(),
            'seo': {
                'meta_title': post['title'],
                'meta_description': post['excerpt'] or post['content'][:160],
            }
        }
        
        # Add category-specific data
        if category_type == 'recipes':
            formatted_post['recipe_data'] = self._extract_recipe_data(post)
        elif category_type == 'tips_and_tricks':
            formatted_post['tips_data'] = {
                'tip_type': self._get_tip_type(post),
                'difficulty': 'easy'
            }
        elif category_type == 'faq':
            formatted_post['faq_data'] = {
                'question': post['title'],
                'answer': post['content'],
                'category': 'general'
            }
        else:  # blog
            formatted_post['blog_data'] = {
                'author': 'Admin',
                'reading_time': max(1, len(post['content'].split()) // 200)
            }
        
        # Add tags from categories
        formatted_post['tags'] = [cat['name'] for cat in post['categories']]
        
        return formatted_post
    
    def _extract_recipe_data(self, post):
        """Extract recipe-specific data"""
        content = post['content']
        
        # Simple ingredient extraction
        ingredients = []
        instructions = []
        
        lines = content.split('\n')
        in_ingredients = False
        in_instructions = False
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
            
            line_lower = line.lower()
            
            # Detect sections
            if any(word in line_lower for word in ['ingredient', 'items needed', 'you will need']):
                in_ingredients = True
                in_instructions = False
                continue
            elif any(word in line_lower for word in ['method', 'instruction', 'direction', 'step']):
                in_ingredients = False
                in_instructions = True
                continue
            
            # Extract ingredients
            if in_ingredients and line:
                if line.startswith(('-', '•', '*')) or line[0].isdigit():
                    ingredients.append(line.strip('-•* ').strip())
                elif len(line) < 100:  # Likely an ingredient if short
                    ingredients.append(line)
            
            # Extract instructions
            elif in_instructions and line:
                if line[0].isdigit() or line.startswith(('-', '•')):
                    instructions.append(line.strip('-•* ').strip())
                elif len(line) > 10:  # Likely instruction if substantial
                    instructions.append(line)
        
        # Extract servings
        servings = 4  # Default
        servings_match = re.search(r'(?:serves?|servings?|for)\s*(\d+)', content.lower())
        if servings_match:
            servings = int(servings_match.group(1))
        
        # Determine cuisine from categories
        cuisine = 'Pakistani'  # Default
        for cat in post['categories']:
            cat_lower = cat['name'].lower()
            if 'pakistani' in cat_lower or 'desi' in cat_lower:
                cuisine = 'Pakistani'
            elif 'indian' in cat_lower:
                cuisine = 'Indian'
            elif 'chinese' in cat_lower:
                cuisine = 'Chinese'
        
        return {
            'ingredients': ingredients[:20],  # Limit to 20
            'instructions': instructions[:15],  # Limit to 15
            'servings': servings,
            'cuisine': cuisine,
            'difficulty': 'medium',  # Default
            'prep_time': '30 minutes',  # Default
            'cook_time': '45 minutes'   # Default
        }
    
    def _get_tip_type(self, post):
        """Determine tip type"""
        title_lower = post['title'].lower()
        if 'garnish' in title_lower:
            return 'garnishing'
        elif 'storage' in title_lower or 'preserve' in title_lower:
            return 'storage'
        elif 'cut' in title_lower or 'chop' in title_lower:
            return 'preparation'
        else:
            return 'general'
    
    def _slugify(self, text):
        """Create URL-friendly slug"""
        slug = re.sub(r'[^\w\s-]', '', text.lower())
        slug = re.sub(r'[-\s]+', '-', slug)
        return slug.strip('-')
    
    def save_to_json(self, output_file, data):
        """Save data to JSON file"""
        try:
            output_data = {
                'metadata': {
                    'source': 'WordPress XML Export - The Recipes PK',
                    'conversion_date': datetime.now().isoformat(),
                    'total_posts': sum(len(posts) for posts in data.values()),
                    'categories_count': {
                        'recipes': len(data['recipes']),
                        'blog': len(data['blog']),
                        'tips_and_tricks': len(data['tips_and_tricks']),
                        'faq': len(data['faq'])
                    }
                },
                'data': data
            }
            
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(output_data, f, indent=2, ensure_ascii=False)
            
            print(f"Successfully saved to {output_file}")
            print(f"Total posts: {output_data['metadata']['total_posts']}")
            print(f"  - Recipes: {output_data['metadata']['categories_count']['recipes']}")
            print(f"  - Blog posts: {output_data['metadata']['categories_count']['blog']}")
            print(f"  - Tips & Tricks: {output_data['metadata']['categories_count']['tips_and_tricks']}")
            print(f"  - FAQ: {output_data['metadata']['categories_count']['faq']}")
            
            return True
        except Exception as e:
            print(f"Error saving to JSON: {e}")
            return False

# Main execution
if __name__ == "__main__":
    xml_file = r"c:\Users\Administrator\Downloads\therecipespk.WordPress.2025-09-23.xml"
    output_file = r"e:\RecipeWB - Copy\recipe_data.json"
    
    print("WordPress XML to JSON Converter for Recipe Website")
    print("=" * 50)
    
    converter = SimpleWordPressConverter(xml_file)
    categorized_data = converter.parse_and_convert()
    
    if categorized_data:
        if converter.save_to_json(output_file, categorized_data):
            print("\nConversion completed successfully!")
            print("Your WordPress data has been converted and categorized for your Mongoose backend.")
        else:
            print("Failed to save the JSON file")
    else:
        print("Failed to parse the XML file")