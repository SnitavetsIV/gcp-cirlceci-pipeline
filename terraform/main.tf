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

resource "google_storage_bucket" "gcf-source-bucket" {
  name                        = "${var.google_project_id}-gcf-source"
  location                    = "US"
  uniform_bucket_level_access = true
}

resource "google_storage_bucket_object" "profile-service-source" {
  name   = "profile-service-source.${timestamp()}.zip"
  bucket = google_storage_bucket.gcf-source-bucket.name
  source = "profile-service-source.zip"
}

resource "google_cloudfunctions_function" "profile-service" {
  name                  = "profile-service"
  description           = "Function to hande profile service"
  runtime               = "nodejs16"
  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.gcf-source-bucket.name
  source_archive_object = google_storage_bucket_object.profile-service-source.name
  trigger_http          = true
  entry_point           = "profile"
}

output "function_uri" {
  value = google_cloudfunctions_function.profile-service.https_trigger_url
}
