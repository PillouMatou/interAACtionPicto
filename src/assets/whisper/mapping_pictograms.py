# me réfléchir pouvoir non toi voir aujourd'hui
# plaire heureusement aller_en_excursion_en_autobus au ville
import pandas as pd
import sys
from argparse import ArgumentParser, RawTextHelpFormatter


def process_output_trad(sentence):  # crée une liste avec chaque keyword
  return sentence.split(" ")


def read_lexicon(lexicon):  # lecture du lexique
  df = pd.read_csv(lexicon, sep='\t')
  df.loc[:, 'keyword_no_cat'] = df['lemma'].apply(lambda a: "_".join(str(a).split(' #')[0].strip().split(" ")))
  return df


def get_id_picto_from_predicted_lemma(df_lexicon, lemma):  # récupère l'identifiant du pictogramme lié à chaque keyword
  id_picto = df_lexicon.loc[df_lexicon['keyword_no_cat'] == lemma, "id_picto"].tolist()
  return (id_picto[0], lemma) if id_picto else (0, lemma)


def get_sequence_of_pictos(sentence, lexicon_file):  # récupère la séquence de pictogrammes liés à chaque keyword
  # la fonction retourne ces éléments : [(21917, 'plaire'), (5397, 'heureusement'), (4671, 'aller_en_excursion_en_autobus'), (11709, 'au'), (2704, 'ville')]
  lexicon = read_lexicon(lexicon_file)
  sentence_to_map = process_output_trad(sentence)
  id_pictograms = [get_id_picto_from_predicted_lemma(lexicon, lemma) for lemma in sentence_to_map]
  # print(id_pictograms, file=sys.stderr) # Print pour vérifier le bon fonctionnement du script.
  return id_pictograms


if __name__ == '__main__':
  parser = ArgumentParser(description="Transfer a sentence to a sequence of pictograms",
                          formatter_class=RawTextHelpFormatter)
  parser.add_argument('--text', type=str, required=True,
                      help="")
  parser.add_argument('--lexicon', type=str, required=True,
                      help="")
  args = parser.parse_args()
  get_sequence_of_pictos(args.text, args.lexicon) # On peut aussi choisir de laisser lexicon en "lexique.csv" par défaut
