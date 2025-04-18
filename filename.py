import os
import re

# 파일이 들어있는 디렉토리 경로
image_dir = r"C:\\Users\\ssginc19\\Desktop\\goods_images-2025-03-18\\goods_images"
output_sql_path = os.path.join(os.path.dirname(image_dir), "update_goods_image.sql")

# SQL문을 저장할 리스트
sql_statements = []

# 파일명 순회하며 숫자 추출 + SQL 생성
for filename in os.listdir(image_dir):
    # 숫자만 추출
    match = re.search(r"(\d+)", filename)
    if match:
        goods_id = match.group(1)
        s3_path = f"https://daily24imagebucket.s3.ap-northeast-1.amazonaws.com/goods_images/{filename}"
        sql = f"UPDATE goods SET goods_image = '{s3_path}' WHERE goods_id = {goods_id};"
        sql_statements.append(sql)

# SQL문을 파일로 저장
with open(output_sql_path, "w", encoding="utf-8") as f:
    f.write("\n".join(sql_statements))

print(f"✅ SQL 파일 생성 완료: {output_sql_path}")