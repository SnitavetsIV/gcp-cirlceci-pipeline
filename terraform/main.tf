variable "google_project_id" {
  type      = string
  sensitive = true
}

variable "google_region" {
  type      = string
  sensitive = true
}

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 4.34.0"
    }
  }
  backend "gcs" {}
}

provider "google" {
  project = var.google_project_id
  region = var.google_region
}

resource "google_storage_bucket" "bucket" {
  name                        = "${var.google_project_id}-gcf-source" # Every bucket name must be globally unique
  location                    = "US"
  uniform_bucket_level_access = true
}

resource "google_storage_bucket_object" "object" {
  name   = "sourcecode.${timestamp()}.zip"
  bucket = google_storage_bucket.bucket.name
  source = "function-source.zip" # Add path to the zipped function source code
}

resource "google_cloudfunctions_function" "function" {
  name                  = "function-v2"
  description           = "a new function"
  runtime               = "nodejs16"
  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.bucket.name
  source_archive_object = google_storage_bucket_object.object.name
  trigger_http          = true
  entry_point           = "profile"
}

output "function_uri" {
  value = google_cloudfunctions_function.function.https_trigger_url
}
