#!/usr/bin/python

# usage : python run_TA.py --sentence "je pense pas pouvoir te voir aujourd'hui" --model "/home/getalp/macairec/T5_decode/orfeo/checkpoint-289240"

# ------------ Libraries ------------ #
import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import numpy as np
from argparse import ArgumentParser, RawTextHelpFormatter

# ------------ Paramètres ------------ #
source_lang = "fr"
target_lang = "frp"
max_input_length = 128
max_target_length = 128


# ------------ Modèle ------------ #
def load_model(checkpoint): # on appelle le modèle
  tokenizer = AutoTokenizer.from_pretrained(checkpoint)
  model = AutoModelForSeq2SeqLM.from_pretrained(checkpoint)
  model = model.to("cuda:0")
  return tokenizer, model


# ------------ Generation ------------ #
def generate(sentence, tokenizer, model): # puis on génère la traduction
  inputs = tokenizer("" + sentence, return_tensors="pt").input_ids
  outputs = model.generate(inputs.to("cuda:0"), max_new_tokens=40, do_sample=True, top_k=30, top_p=0.95)
  pred = tokenizer.decode(outputs[0], skip_special_tokens=True)
  return pred.strip()


# ------------ Main ------------ #
def main(args):
  sentence_to_translate = args.sentence
  tokenizer, model = load_model(args.model)
  return generate(sentence_to_translate, tokenizer, model)


if __name__ == '__main__':
  parser = ArgumentParser(description="Traduction d'une phrase en pictogrammes",
                          formatter_class=RawTextHelpFormatter)
  parser.add_argument('--sentence', type=str, required=True,
                      help="")
  parser.add_argument('--model', type=str, required=True,
                      help="")
  parser.set_defaults(func=main)
  args = parser.parse_args()
  args.func(args)
