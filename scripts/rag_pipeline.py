from langchain_community.document_loaders import DirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma


loader = DirectoryLoader(
    "knowledge_base/",
    glob="**/*.md"
)

documents = loader.load()

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

docs = text_splitter.split_documents(
    documents
)

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)
vector_db = Chroma.from_documents(
    docs,
    embedding_model,
    persist_directory="vector_db"
)

vector_db.persist()
query = "How should the bank retain wealthy customers?"

results = vector_db.similarity_search(
    query,
    k=3
)

for result in results:
    print(result.page_content)
    print("-" * 50)